import "server-only";
import { Document, Page, Text, View, StyleSheet, renderToBuffer } from "@react-pdf/renderer";
import type { ReactNode } from "react";

const styles = StyleSheet.create({
  page: { paddingTop: 48, paddingBottom: 56, paddingHorizontal: 54, fontSize: 10.5, lineHeight: 1.5, color: "#15171c", fontFamily: "Helvetica" },
  brand: { fontSize: 9, letterSpacing: 3, color: "#2f5fe8", marginBottom: 18 },
  h1: { fontSize: 18, fontFamily: "Helvetica-Bold", color: "#050505", marginBottom: 10 },
  h2: { fontSize: 12, fontFamily: "Helvetica-Bold", color: "#050505", marginTop: 14, marginBottom: 4 },
  p: { marginBottom: 6 },
  li: { flexDirection: "row", marginBottom: 3 },
  bullet: { width: 12, color: "#2f5fe8" },
  liText: { flex: 1 },
  bold: { fontFamily: "Helvetica-Bold" },
  footer: { position: "absolute", bottom: 28, left: 54, right: 54, fontSize: 8, color: "#5f6670", flexDirection: "row", justifyContent: "space-between" },
});

/** Renders **bold** spans inside a line. */
function inline(text: string): ReactNode[] {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <Text key={i} style={styles.bold}>
        {part.slice(2, -2)}
      </Text>
    ) : (
      part.replace(/[*_`]/g, "")
    ),
  );
}

/** Minimal markdown → react-pdf: headings, bullets, numbered items, paragraphs. */
function blocks(md: string) {
  const out: ReactNode[] = [];
  md.split("\n").forEach((raw, i) => {
    const line = raw.trimEnd();
    if (!line.trim()) return;
    let m: RegExpMatchArray | null;
    if ((m = line.match(/^#\s+(.*)/))) out.push(<Text key={i} style={styles.h1}>{inline(m[1])}</Text>);
    else if ((m = line.match(/^#{2,6}\s+(.*)/))) out.push(<Text key={i} style={styles.h2}>{inline(m[1])}</Text>);
    else if ((m = line.match(/^\s*(?:[-*]|(\d+)\.)\s+(.*)/)))
      out.push(
        <View key={i} style={styles.li}>
          <Text style={styles.bullet}>{m[1] ? `${m[1]}.` : "•"}</Text>
          <Text style={styles.liText}>{inline(m[2])}</Text>
        </View>,
      );
    else out.push(<Text key={i} style={styles.p}>{inline(line)}</Text>);
  });
  return out;
}

export async function renderProposalPdf(markdown: string, meta: { company: string; date: string }) {
  return renderToBuffer(
    <Document title={`Chanium proposal — ${meta.company}`} author="Chanium LLC">
      <Page size="LETTER" style={styles.page}>
        <Text style={styles.brand}>CHANIUM</Text>
        {blocks(markdown)}
        <View style={styles.footer} fixed>
          <Text>Chanium LLC · hello@chanium.com · chanium.com</Text>
          <Text>Prepared {meta.date}</Text>
        </View>
      </Page>
    </Document>,
  );
}

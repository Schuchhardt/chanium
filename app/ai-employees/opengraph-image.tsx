import { renderOg, ogSize, ogContentType } from "@/lib/og";
import { employeesPage } from "@/content/employees";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = employeesPage.h1;

export default function Image() {
  return renderOg({ title: employeesPage.h1, eyebrow: "AI Employees" });
}

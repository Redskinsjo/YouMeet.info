import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import puppeteer from "puppeteer";
import z from "zod";
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: NextRequest) {
  const input = await req.json();

  try {
    console.log(input, "input");

    if (input.job) {
      const res = await openai.chat.completions.create({
        model: "gpt-4o",
        frequency_penalty: 1,
        temperature: 0.5,
        messages: [
          {
            role: "user",
            content:
              "Peux-tu me générer un CV en HTML pour un poste de " +
              input.job +
              " ?",
          },
        ],
        response_format: {
          type: "json_schema",
          json_schema: {
            name: "cv_in_html",
            description: "The CV in HTML format",
            schema: {
              type: "object",
              description: "The CV in HTML format",
              properties: {
                content: {
                  type: "string",
                  description: "The CV in HTML format",
                },
              },
            },
          },
        },
      });

      const content = res.choices[0].message.content;
      const parsed = JSON.parse(content || "");

      console.log(parsed.content.slice(0, 10), "parsed.content");
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.setContent(parsed.content);

      // Générer le PDF en mémoire (buffer)
      const pdfBuffer = await page.pdf({
        format: "A4",
        printBackground: true,
      });

      console.log(pdfBuffer, "pdfBuffer");

      await browser.close();

      const bufferLength = pdfBuffer.byteLength;

      return new Response(pdfBuffer, {
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": 'attachment; filename="cv_frontend.pdf"',
          "Content-Length": bufferLength.toString(),
        },
      });
    }
  } catch (err: any) {
    console.error(err, "err");
    return Response.json({ error: err.message }, { status: 400 });
  }
}

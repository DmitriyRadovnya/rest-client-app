import { getPostmanRequest } from '@/lib/utils/getPostmanRequest';
import codegen from 'postman-code-generators';
import { NextResponse } from 'next/server';

export const POST = async (req: Request) => {
  try {
    const { lang, variant, request } = await req.json();

    const postmanRequest = getPostmanRequest(request);

    const options = {
      indentCount: 3,
      indentType: 'Space',
      trimRequestBody: true,
      followRedirect: true,
    };

    const snippet = await new Promise<string>((resolve, reject) => {
      codegen.convert(lang, variant, postmanRequest, options, (err, out) =>
        err ? reject(err) : resolve(out || '')
      );
    });

    return NextResponse.json({ snippet });
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message });
  }
};

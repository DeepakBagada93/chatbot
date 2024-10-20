import { NextResponse } from 'next/server';
import { MyTensorFlowModel } from '@/utils/tfModel';

const myModel = new MyTensorFlowModel();

export async function POST(request) {
  console.log('Received request to chatbot API');

  try {
    const { message } = await request.json();
    console.log('Message received:', message);

    if (!myModel.model) {
      console.log('Initializing model...');
      await myModel.initializeModel();
    }

    const reply = myModel.getReply(message);
    console.log('Reply generated:', reply);

    return NextResponse.json({ reply });
  } catch (error) {
    console.error('Error in chatbot API:', error);
    return NextResponse.json({ error: 'Failed to process the request' }, { status: 500 });
  }
}

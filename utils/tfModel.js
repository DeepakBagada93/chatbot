import * as tf from '@tensorflow/tfjs';
import { trainingData } from './dataset';

export class MyTensorFlowModel {
  constructor() {
    this.model = null;
    this.trainingData = trainingData; // Load your custom dataset
  }

  async initializeModel() {
    console.log('Initializing TensorFlow model');
    // Simple sequential model setup can be done here if needed
    // This is just a placeholder to show model initialization
    this.model = tf.sequential();
  }

  getReply(userInput) {
    console.log('Generating reply for message:', userInput);

    // Find a matching response from the dataset
    const match = this.trainingData.find(item => 
      item.input.toLowerCase() === userInput.toLowerCase()
    );

    const response = match ? match.output : "I'm sorry, I didn't understand that.";
    console.log('Generated response:', response);
    return response;
  }
}

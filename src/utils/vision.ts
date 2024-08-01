import axios from "axios";

export const classifyImageWithVision = async (imageBase64: string) => {
  const apiKey = process.env.NEXT_PUBLIC_VISION_API_KEY;
  const apiUrl = `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`;
  const requestPayload = {
    requests: [
      {
        image: {
          content: imageBase64.split(",")[1],
        },
        features: [
          {
            max_results: 2,
            type: "LABEL_DETECTION",
          },
          {
            type: "SAFE_SEARCH_DETECTION",
          },
        ],
      },
    ],
  };

  try {
    const response = await axios.post(apiUrl, requestPayload);
    const labels = response.data.responses[0].labelAnnotations;

    if (labels && labels.length > 0) {
      return labels[0].description;
    }
    return "Unknown Item";
  } catch (error) {
    console.error(`Error classifying image: ${error}`);
  }
};

import axios from 'axios';

export const axiosResponse = async (
    apiURL,
    requestBody,
    authToken,
  ) => {
    try {
      const response = await axios.post(apiURL, requestBody, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      });
      console.log('axios Data:-', response.data);
      return response.data;
    } catch (error) {
      // handle error
      console.log('axios Exception:-', error);
    }
  };

import axios from "axios";
export default {
  action: async (inputs, output) => {
    await axios
      .post("/api/v1/setConfigFrontEnd", {
        config: inputs.config,
      })
      .then(function(response) {
        if (response.data.success) {
          return output.success(response.data);
        } else {
          return output.error(response.data);
        }
      })
      .catch(function(error) {
        return output.error(error);
      });
  }
};

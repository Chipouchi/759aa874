import axios from "axios";

const BASE_URL = "https://aircall-backend.onrender.com";

const Services = {
  async GetAllActivities() {
    const url = `${BASE_URL}/activities`;
    try {
      const response = await axios.get(url);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      return error.response;
    }
  },
  async GetActivity(activity) {
    const url = `${BASE_URL}/activities/${activity}`;
    try {
      const response = await axios.get(url);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      return error.response;
    }
  },
  async UpdateArchive(activity) {
    const ArchiveBody = {
      is_archived: !activity.is_archived,
    };
    const url = `${BASE_URL}/activities/${activity.id}`;
    try {
      const response = await axios.patch(url, ArchiveBody, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      console.log(error);
      return error.response;
    }
  },
};

export default Services;

import Api from "../service/axios.config";

const ChestController = {
    async list() {
        try {
            const { data } = await Api.get("/chest/list");
            return Promise.resolve(data);;
        } catch (e) {
            console.error(e);
            return Promise.reject(e.message);
        }
    }
}

export default ChestController;
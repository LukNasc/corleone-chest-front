import Api from "../service/axios.config";

const LogsController = {
    async list() {
        try {
            const { data } = await Api.get("/log/list");
            return Promise.resolve(data);
        } catch (e) {
            console.error(e);
            return Promise.reject(e.message);
        }
    },
    async listAggregate(id, date) {
        if (!date) date = new Date().toLocaleDateString("pt-Br");
        try {
            const { data } = await Api.get(`/log/list/${date.replaceAll("/", "-")}/${id}`);

            return data;
        } catch (e) {
            console.error(e);
            return e.message
        }
    }
}

export default LogsController;
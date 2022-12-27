import Api from "../api/axios.config";

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
    async listAggregate(member_id, dates) {
        console.log(dates)
        try {
            const { data } = await Api.post(`/log/listAggregate`, { dates, member_id });

            return data;
        } catch (e) {
            console.error(e);
            return e.message
        }
    }
}

export default LogsController;
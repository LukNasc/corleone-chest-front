import Api from "../api/axios.config";

const MembersController = {
    async list() {
        try {
            const { data } = await Api.get("/members/list");
            return Promise.resolve(data);
        } catch (e) {
            console.error(e);
            return Promise.reject(e.message);
        }
    },
    async updateById(body) {
        try {
            const { _id, ...update } = body
            const { data } = await Api.post("/members/updatePosition", {
                _id,
                update
            });
            return Promise.resolve(data);
        } catch (e) {
            console.error(e);
            return Promise.reject(e.message);
        }
    },
    async login(body) {
        try {
            const { data } = await Api.post("/members/login", body);
            return Promise.resolve(data);
        } catch (e) {
            console.error(e);
            return Promise.reject(e.message);
        }
    }
}

export default MembersController;
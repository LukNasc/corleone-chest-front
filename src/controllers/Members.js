import Api from "../service/axios.config";

const MembersController = {
    async list() {
        try {
            const { data } = await Api.get("/members/list");
            return Promise.resolve(data);
        } catch (e) {
            console.error(e);
            return Promise.reject(e.message);
        }
    }
}

export default MembersController;
import axios from 'axios';


export default class API {

    static async getAllposts(){
        const res = await axios.get('/posts');
        return res.data;
    }

    static async getPostByID(id){
        const res = await axios.get(`/posts/${id}`);
        return res.data;
    }

    static async addnewPost(post){
        const res = await axios.post('/posts', post);
        return res.data;
    }

    static async updatePost(id, post){
        const res = await axios.patch(`/posts/${id}`,post);
        return res.data;
    }

    static async deletePost(id){
        const res = await axios.delete(`/posts/${id}`);
        return res.data;
    }
}
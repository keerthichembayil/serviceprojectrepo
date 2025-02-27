import axios from 'axios';
const instance=axios.create({
    baseURL:import.meta.env.VITE_BASE_URL || 'http://localhost:5000/api',
})
export default instance;
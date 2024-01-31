import axios from "axios";

const getListFood = async () => {
    return await axios.get('http://localhost/CoffeeOrder/api/danh-sach-mon')
}

export default {
    getListFood
}
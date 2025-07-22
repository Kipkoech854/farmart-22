import axios from 'axios';


export const pendingOrders = async ()   =>{
try{
    const response = await axios.get('https://farmart-y80m.onrender.com/api/orders/pending',options);
    const options ={
        headers:{
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }
    } 
    return response.data;
} catch(error){
    console.error(error)
}
}
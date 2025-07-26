import axios from 'axios';


export const pendingOrders = async ()   =>{
try{
    const response = await axios.get('https://farmart-y80m.onrender.com/api/Orders/pending',options);
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

export const Confirmed = async () => {
    try {
        const options = {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            }
        };

        const response = await axios.get('https://farmart-y80m.onrender.com/api/Orders/Confirmed', options);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}


export const DeliveredOrders = async () => {
    try {
        const options = {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            }
        };

        const response = await axios.get('https://farmart-y80m.onrender.com/api/Orders/Delivered', options);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};


export const allOrders = async () => {
  try {
    const options = {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    };

    const response = await axios.get('https://farmart-y80m.onrender.com/api/Orders/all', options);
    return response.data;

  } catch (error) {
    console.error('Error fetching all orders:', error);
    throw error; // optional: so caller can handle it too
  }
};


export const PaidOrders = async () => {
    try {
        const response = await axios.get('https://farmart-y80m.onrender.com/api/Orders', options);
        const options = {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            }
        }
        return response.data;
    } catch (error) {
        console.error(error);
    }
}


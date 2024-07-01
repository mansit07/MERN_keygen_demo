import axios from 'axios'

const URL='http://localhost:4000';

export const addUser = async(newUser)=>{
    try{
        const token = 'admin-e0eb799f87499625863556affad6ede3d7a29c89618cd8902f48a26eb016bad1v3';
        const response = await axios.post(`${URL}/users/add`,newUser, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
    
    })
    console.log('User data:', response.data);
    return response.data;
}
    catch(error){
        console.log("error while calling add user api",error);
    }
}
export const updatedUser = async(id,existingUser)=>{
    console.log(id);
    console.log(existingUser);
    try{
        const token = 'admin-e0eb799f87499625863556affad6ede3d7a29c89618cd8902f48a26eb016bad1v3';
        const response = await axios.post(`${URL}/users/${id}`,existingUser, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
    
    })
    console.log('User data:', response.data);
    return response.data;
}
    catch(error){
        console.log("error while calling add user api",error);
    }
}
export const deleteUser = async(id)=>{

    try{
        const token = 'admin-e0eb799f87499625863556affad6ede3d7a29c89618cd8902f48a26eb016bad1v3';
        const response = await axios.delete(`${URL}/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
    
    })
    console.log('User data:', response.data);
    return response.data;
}
    catch(error){
        console.log("error while calling add user api",error);
    }
}
export const getUsers = async()=>{
    try{
        const token = 'admin-e0eb799f87499625863556affad6ede3d7a29c89618cd8902f48a26eb016bad1v3';
        // return await axios.get(`https://api.keygen.sh/v1/accounts/983a9aa8-468d-4e0d-a06d-e3b132ec00d5/users`)
        const response = await axios.get(`${URL}/users/all`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
        })
        return response;
    }
    catch(error){
        console.log("error while calling getuser api",error);
    }
}
export const getProducts = async()=>{
    try{
        const token = 'admin-e0eb799f87499625863556affad6ede3d7a29c89618cd8902f48a26eb016bad1v3';
        // return await axios.get(`https://api.keygen.sh/v1/accounts/983a9aa8-468d-4e0d-a06d-e3b132ec00d5/users`)
        const response = await axios.get(`${URL}/products/all`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
        })
        return response;
    }
    catch(error){
        console.log("error while calling getProducts api",error);
    }
}

export const addProducts = async(newProduct)=>{
    try{
        const token = 'admin-e0eb799f87499625863556affad6ede3d7a29c89618cd8902f48a26eb016bad1v3';
        const response = await axios.post(`${URL}/products/add`,newProduct, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
    })
    console.log('Product data:', response.data);
    return response.data;
}
    catch(error){
        console.log("error while calling add product api",error);
    }
}

export const updatedProduct = async(id,existingProduct)=>{
    console.log(id);
    console.log(existingProduct);
    try{
        const token = 'admin-e0eb799f87499625863556affad6ede3d7a29c89618cd8902f48a26eb016bad1v3';
        const response = await axios.post(`${URL}/products/${id}`,existingProduct, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
    
    })
    console.log('User data:', response.data);
    return response.data;
}
    catch(error){
        console.log("error while calling add user api",error);
    }
}

export const deleteProduct = async(id)=>{

    try{
        const token = 'admin-e0eb799f87499625863556affad6ede3d7a29c89618cd8902f48a26eb016bad1v3';
        const response = await axios.delete(`${URL}/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
    
    })
    console.log('User data:', response.data);
    return response.data;
}
    catch(error){
        console.log("error while calling add user api",error);
    }
}

export const getAllPolicies = async()=>{
    try{
        const token = 'admin-e0eb799f87499625863556affad6ede3d7a29c89618cd8902f48a26eb016bad1v3';
        // return await axios.get(`https://api.keygen.sh/v1/accounts/983a9aa8-468d-4e0d-a06d-e3b132ec00d5/users`)
        const response = await axios.get(`${URL}/policies/all`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
        })
        return response;
    }
    catch(error){
        console.log("error while calling getPolicies api",error);
    }
}
export const getAllLicense = async ()=>{
    try{
        const token = 'admin-e0eb799f87499625863556affad6ede3d7a29c89618cd8902f48a26eb016bad1v3';
        // return await axios.get(`https://api.keygen.sh/v1/accounts/983a9aa8-468d-4e0d-a06d-e3b132ec00d5/users`)
        const response = await axios.get(`${URL}/licenses/all`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
        })
        return response;
    }
    catch(error){
        console.log("error while calling getLicense api",error);
    }
}
export const getAllMachines = async ()=>{
    try{
        const token = 'admin-e0eb799f87499625863556affad6ede3d7a29c89618cd8902f48a26eb016bad1v3';
        // return await axios.get(`https://api.keygen.sh/v1/accounts/983a9aa8-468d-4e0d-a06d-e3b132ec00d5/users`)
        const response = await axios.get(`${URL}/machines/all`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
        })
        return response;
    }
    catch(error){
        console.log("error while calling getLicense api",error);
    }
}

export const addPolicy = async(policy)=>{
    const policydata = {
        name : policy.name,
        product:policy.product
    }
        try{
            const token = 'admin-e0eb799f87499625863556affad6ede3d7a29c89618cd8902f48a26eb016bad1v3';
            const response = await axios.post(`${URL}/policies/add`,policydata, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
        })
        console.log('Product data:', response.data);
        return response.data;
        }
        catch(error){
            console.log("error while calling add product api",error);
        }
}
export const updatePolicy = async(id,existingPolicy)=>{
    console.log(id);
    console.log(existingPolicy);
    const policydata = {
        name : existingPolicy.name,
        product:existingPolicy.product
    }
    try{
        const token = 'admin-e0eb799f87499625863556affad6ede3d7a29c89618cd8902f48a26eb016bad1v3';
        const response = await axios.post(`${URL}/policies/${id}`,policydata, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
    
    })
    console.log('User data:', response.data);
    return response.data;
}
    catch(error){
        console.log("error while calling add user api",error);
    }
}

export const deletePolicy = async(id)=>{

    try{
        const token = 'admin-e0eb799f87499625863556affad6ede3d7a29c89618cd8902f48a26eb016bad1v3';
        const response = await axios.delete(`${URL}/policies/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
    
    })
    console.log('User data:', response.data);
    return response.data;
}
    catch(error){
        console.log("error while calling add user api",error);
    }
}

export const addLicense = async(newLicense)=>{
    console.log(newLicense);
    try{
        const token = 'admin-e0eb799f87499625863556affad6ede3d7a29c89618cd8902f48a26eb016bad1v3';
        const response = await axios.post(`${URL}/licenses/add`,newLicense, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
    })
    console.log('Product data:', response.data);
    return response.data;
}
    catch(error){
        console.log("error while calling add product api",error);
    }
}
export const updateLicense = async(id,existingLicense)=>{
    console.log(id);
    console.log(existingLicense);
    const policydata = {
        name : existingLicense.name,
        policy: existingLicense.policy,
        users: existingLicense.users
    }
    try{
        const token = 'admin-e0eb799f87499625863556affad6ede3d7a29c89618cd8902f48a26eb016bad1v3';
        const response = await axios.post(`${URL}/licenses/${id}`,policydata, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
    
    })
    console.log('User data:', response.data);
    return response.data;
}
    catch(error){
        console.log("error while calling add user api",error);
    }
}
export const deleteLicense = async(id)=>{

    try{
        const token = 'admin-e0eb799f87499625863556affad6ede3d7a29c89618cd8902f48a26eb016bad1v3';
        const response = await axios.delete(`${URL}/licenses/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
    
    })
    console.log('User data:', response.data);
    return response.data;
}
    catch(error){
        console.log("error while calling add user api",error);
    }
}
export const addMachine = async(newMachine)=>{
    console.log(newMachine);
    try{
        const token = 'admin-e0eb799f87499625863556affad6ede3d7a29c89618cd8902f48a26eb016bad1v3';
        const response = await axios.post(`${URL}/machines/add`,newMachine, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
    })
    console.log('newMachine data:', response.data);
    return response.data;
}
    catch(error){
        console.log("error while calling add newMachine api",error);
    }
}

export const updateMachine = async(id,existingMachine)=>{
    const policydata = {
        name : existingMachine.name,
        fingerprint: existingMachine.fingerprint,
        ip: existingMachine.ip
    }
    try{
        const token = 'admin-e0eb799f87499625863556affad6ede3d7a29c89618cd8902f48a26eb016bad1v3';
        const response = await axios.post(`${URL}/machines/${id}`,policydata, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
    
    })
    console.log('User data:', response.data);
    return response.data;
}
    catch(error){
        console.log("error while calling add user api",error);
    }
}

export const deleteMachine = async(id)=>{

    try{
        const token = 'admin-e0eb799f87499625863556affad6ede3d7a29c89618cd8902f48a26eb016bad1v3';
        const response = await axios.delete(`${URL}/machines/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
    
    })
    console.log('User data:', response.data);
    return response.data;
}
    catch(error){
        console.log("error while calling add user api",error);
    }
}



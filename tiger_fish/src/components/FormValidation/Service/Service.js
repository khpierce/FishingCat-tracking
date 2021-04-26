import Axios from "axios"

// export function insertFishingCat(data) {
//     let fishingCat=getAllfishingCat();
//     data['id'] = generatefishingCatId()
//     fishingCat.push(data)
//     localStorage.setItem(KEYS.fishingCat,JSON.stringify(fishingCat))
// }

export function insertFishingCat(data){
    // console.log(data)
    Axios.post('http://localhost:3007/insert', {
        deviceIMEI: data.deviceIMEI,
        name: data.name,
        age: data.age,
        weight: data.weight,
        sex: data.sex,
        installationDate: data.installationDate,
    })
}

// export function updateFishingCat(data) {
//     let fishingCat = getAllfishingCat();
//     let recordIndex = fishingCat.findIndex(x => x.id === data.id);
//     fishingCat[recordIndex] = { ...data }
//     localStorage.setItem(KEYS.fishingCat,JSON.stringify(fishingCat))
// }

export function updateFishingCat(data) {
    Axios.put('http://localhost:3007/update', {
        id: data.id,
        deviceIMEI: data.deviceIMEI,
        name: data.name,
        age: data.age,
        weight: data.weight,
        sex: data.sex,
        installationDate: data.installationDate,
    })
}

// export function deleteFishingCat(id) {
//     let fishingCat = getAllfishingCat();
//     fishingCat = fishingCat.filter(x => x.id !== id)
//     localStorage.setItem(KEYS.fishingCat,JSON.stringify(fishingCat))
// }

export function deleteFishingCat(id) {
    Axios.delete(`http://localhost:3007/delete/${id}`);
}

// export function getAllfishingCat() {
//     if (localStorage.getItem(KEYS.fishingCat) == null)
//         localStorage.setItem(KEYS.fishingCat, JSON.stringify([]))
//     console.log(typeof(JSON.parse(localStorage.getItem(KEYS.fishingCat))))
//     return JSON.parse(localStorage.getItem(KEYS.fishingCat));
// }

export async function getAllfishingCat(){
    const result = await Axios.get('http://localhost:3007/fishingCatProfile');
    return await result
}

//------------------------------------//

export async function getAllLocation(){
    const result = await Axios.get('http://localhost:3007/fishingCatLocation');
    return await result
}

export function deleteAllLocation(imei) {
    Axios.delete(`http://localhost:3007/deleteLocation/${imei}`);
}



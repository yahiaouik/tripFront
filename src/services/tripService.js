import axios from 'axios'

const URL = "https://tripservertse.herokuapp.com"

// recupere tous les voyages de tous les utilisateurs
export async function getAllTrips(token) {
	return await axios ({
	url: URL + "/trips/",
    method: "GET",
    headers: {
        'Authorization': `Bearer ${token}`
    },
})
}

// recupere tous les voyages d'un utilisateur
export async function getUserTrips(userId, token) {

	return await axios ({
	url: URL + "/trips/"+userId,
    method: "GET",
    headers: {
        'Authorization': `Bearer ${token}`
    },
})
}

// creer un nouveau voyage
export async function createUserTrip(trip, token) {
	return await axios ({
	url: URL + "/trips/",
    method: "POST",
    data: trip,
    headers: {
        'Authorization': `Bearer ${token}`
    },
})
}

// supprimer un voyage
export async function deleteUserTrip(id, token) {
	return await axios ({
	url: URL + "/trips/"+id,
    method: "DELETE",
    headers: {
        'Authorization': `Bearer ${token}`
    },
})
}

// mise à jours d'un voyage 
export async function updateUserTrip(data, token) {
	return await axios ({
	url: URL + "/trips/"+data.tripId,
    method: "PATCH",
    headers: {
        'Authorization': `Bearer ${token}`
    },
    data: data
})
}

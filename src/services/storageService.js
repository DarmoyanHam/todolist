export const storageService = {
    saveToStorage(key, todos) {
        localStorage.setItem(key, JSON.stringify(todos));
    },
    
    loadFromStorage(key) {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : [];
    }
}
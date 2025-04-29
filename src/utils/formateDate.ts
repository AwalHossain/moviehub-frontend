const formatReviewDate = (dateString: string) => {
    try {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric', month: 'short', day: 'numeric'
        });
    } catch (e) {
        console.error("Error formatting review date:", e);
        return dateString; 
    }
};




const getYear = (dateString: string | undefined) => {
    if (!dateString) return '';
    try {
        return new Date(dateString).getFullYear();
    } catch {
        return '';
    }
}

export { formatReviewDate, getYear };


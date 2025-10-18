


export default class FormValidation {
    isRequired(value) {
        return value && value.trim() !== "";
    }

    isEmail(value) {
        if (!value) return false; // empty check
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // slightly better regex
        return regex.test(value.trim());
    }

    minLength(value, length) {
        return value.length >= length;
    }
}
export default class EnvProvider {
    public static get currentDateTime(): string {
        const date = new Date();
        
        const components = [
            date.getFullYear(),
            date.getMonth() + 1,
            date.getDate(),
            date.getHours(),
            date.getMinutes(),
            date.getSeconds()];
        
        const [year, month, day, hours, minutes, seconds] = components.map(comp => String(comp).padStart(2, '0'));
        
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }
}
export function convertSecondsToTime(seconds: number): string {
    const days = Math.floor(seconds / (24 * 60 * 60));
    seconds %= (24 * 60 * 60);
    
    const hours = Math.floor(seconds / 3600);
    seconds %= 3600;

    const minutes = Math.floor(seconds / 60);
    
    let timeString = `${hours}:${minutes.toString().padStart(2, '0')}`;
    
    if (days > 0) {
        timeString = `${days}д ${timeString}`;
    }

    return timeString;
}
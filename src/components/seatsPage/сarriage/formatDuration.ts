export function formatDuration(seconds: number): string {
    const days: number = Math.floor(seconds / (24 * 3600));
    seconds %= (24 * 3600);
    const hours: number = Math.floor(seconds / 3600);
    seconds %= 3600;
    const minutes: number = Math.floor(seconds / 60);

    const dayStr: string = days === 1 ? 'день' : (days > 1 && days < 5 ? 'дня' : 'дней');
    const hourStr: string = hours === 1 ? 'час' : (hours > 1 && hours < 5 ? 'часа' : 'часов');
    const minuteStr: string = minutes === 1 ? 'минута' : (minutes > 1 && minutes < 5 ? 'минуты' : 'минут');

    return `${days} ${dayStr} ${hours} ${hourStr} ${minutes} ${minuteStr}`;
}


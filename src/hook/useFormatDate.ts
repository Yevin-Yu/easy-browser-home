// formatDate.ts

export function formatDate(dateStr: string, format: string): string {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) {
      console.error('Invalid date string');
      return '';
    }
  
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    };
  
    const parts = new Intl.DateTimeFormat('zh-CN', options).formatToParts(date);
    const dateParts: { [key: string]: string } = {};
    parts.forEach(({ type, value }) => {
      dateParts[type] = value;
    });
  
    // 根据传入的 format 生成对应的字符串
    let result = format
      .replace('YYYY', dateParts.year)
      .replace('MM', dateParts.month)
      .replace('DD', dateParts.day)
      .replace('HH', dateParts.hour)
      .replace('mm', dateParts.minute)
      .replace('ss', dateParts.second);
  
    return result;
  }
  
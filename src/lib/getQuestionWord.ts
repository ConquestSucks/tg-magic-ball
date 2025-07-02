export const getQuestionWord = (count: number): string => {
    const mod10 = count % 10;
    const mod100 = count % 100;
  
    if (mod100 >= 11 && mod100 <= 14) {
      return 'вопросов';
    }
  
    switch (mod10) {
      case 1:
        return 'вопрос';
      case 2:
      case 3:
      case 4:
        return 'вопроса';
      default:
        return 'вопросов';
    }
  };
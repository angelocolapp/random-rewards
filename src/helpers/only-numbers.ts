export default (str: string) =>
  [...str].filter(c => '0123456789'.indexOf(c) !== -1).join('');

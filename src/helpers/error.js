export default (code, text, loc) => {
  return {
    code,
    error: text,
    location: {
      start: {
        line: loc.start.line,
        column: loc.start.column
      },
      end: {
        line: loc.end.line,
        column: loc.end.column
      }
    }
  };
};

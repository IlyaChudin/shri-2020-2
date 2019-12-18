export default (code, startLine, startColumn, endLine, endColumn) => {
  return {
    code,
    location: {
      start: {
        line: startLine,
        column: startColumn
      },
      end: {
        line: endLine,
        column: endColumn
      }
    }
  };
};

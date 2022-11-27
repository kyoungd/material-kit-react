
function wrapPromise(promise, url, token = null) {
  let status = 'pending';
  let result;
  const suspend = promise(url, token).then(
    (res) => {
      status = 'success';
      result = res;
    },
    (err) => {
      status = 'error';
      result = err;
    }
  );
  return {
    // eslint-disable-next-line consistent-return
    read() {
      if (status === 'pending') {
        throw suspend;
      } else if (status === 'error') {
        throw result;
      } else if (status === 'success') {
        return result;
      }
    }
  };
}

export default wrapPromise;
/*
 * @Author: 苟培烜 3541037829@qq.com
 * @Date: 2023-12-11 00:40:51
 * @LastEditors: 苟培烜 3541037829@qq.com
 * @LastEditTime: 2023-12-20 18:58:00
 * @FilePath: \ai-inv-web\src\api\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export function streamChat(question, fn, donefn) {
  const decoder = new TextDecoder();
  // 发送 POST 请求
  fetch("/api/stream", {
    method: "POST",
    body: JSON.stringify({ content: question }),
    timeout: 0,
    dataType: "text/event-stream",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      // 检查响应是否成功
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      // 返回一个可读流
      return response.body;
    })
    .then((body) => {
      const reader = body.getReader();
      // 读取数据流
      function read() {
        return reader.read().then(({ done, value }) => {
          // 检查是否读取完毕
          if (done) {
            // console.log("已传输完毕");
            donefn();
            return;
          }
          fn(decoder.decode(value));

          // 继续读取下一个数据块
          read();
        });
      }
      // 开始读取数据流
      read();
    })
    .catch((error) => {
      console.error("Fetch error:", error);
    });
}

export function getInterviewerSpeak(
  fn,
  donefn,
  company,
  resume,
  position,
  level,
  span,
  theme,
  duringSpan,
  chatHistory
) {
  const decoder = new TextDecoder();
  // 发送 POST 请求
  fetch("/api/getinterviewerspeak", {
    method: "POST",
    body: JSON.stringify({
      company,
      span,
      duringSpan,
      resume,
      position,
      level,
      theme,
      chatHistory,
    }),
    timeout: 0,
    dataType: "text/event-stream",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      // 检查响应是否成功
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      // 返回一个可读流
      return response.body;
    })
    .then((body) => {
      const reader = body.getReader();
      // 读取数据流
      function read() {
        return reader.read().then(({ done, value }) => {
          // 检查是否读取完毕
          if (done) {
            // console.log("已传输完毕");
            donefn();
            return;
          }
          fn(decoder.decode(value));

          // 继续读取下一个数据块
          read();
        });
      }
      // 开始读取数据流
      read();
    })
    .catch((error) => {
      console.error("Fetch error:", error);
    });
}
export function getIntervieweeSpeak(
  fn,
  donefn,
  company,
  resume,
  position,
  level,
  span,
  theme,
  duringSpan,
  chatHistory
) {
  const decoder = new TextDecoder();
  // 发送 POST 请求
  fetch("/api/getintervieweespeak", {
    method: "POST",
    body: JSON.stringify({
      company,
      span,
      duringSpan,
      resume,
      position,
      level,
      theme,
      chatHistory,
    }),
    timeout: 0,
    dataType: "text/event-stream",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      // 检查响应是否成功
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      // 返回一个可读流
      return response.body;
    })
    .then((body) => {
      const reader = body.getReader();
      // 读取数据流
      function read() {
        return reader.read().then(({ done, value }) => {
          // 检查是否读取完毕
          if (done) {
            // console.log("已传输完毕");
            donefn();
            return;
          }
          fn(decoder.decode(value));

          // 继续读取下一个数据块
          read();
        });
      }
      // 开始读取数据流
      read();
    })
    .catch((error) => {
      console.error("Fetch error:", error);
    });
}

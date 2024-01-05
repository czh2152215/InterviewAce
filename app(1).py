from flask import Flask
import json
import os
from langchain.chat_models import ChatOpenAI
from langchain import PromptTemplate
from flask import (
 request,Response
)

os.environ["OPENAI_API_BASE"] = "https://openai.451024.xyz/v1"
os.environ["OPENAI_API_KEY"] = "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"

chatModel = ChatOpenAI(model_name="gpt-4",streaming=True)
app = Flask(__name__, instance_relative_config=True)


@app.route('/oneshot', methods=['GET', 'POST'])
def chat():
    content = json.loads(request.get_data())['content'] if request.method == 'POST' else '请讲一个笑话'
    return chatModel.predict(content)


@app.route('/stream', methods=['GET', 'POST'])
def chat_stream():
    content = json.loads(request.get_data())['content'] if request.method == 'POST' else '请讲一个笑话'
    res = chatModel.stream(content)

    def generate():
        for trunk in res:
            yield trunk.content

    headers = {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'X-Accel-Buffering': 'no',
    }

    return Response(generate(), mimetype="text/event-stream", headers=headers)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5666)

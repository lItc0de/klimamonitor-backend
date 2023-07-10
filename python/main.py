#!/usr/bin/env python

import datetime
import socketio
import eventlet
import thread

# from gpio import getDistance

# create a Socket.IO server
sio = socketio.Server(cors_allowed_origins='*')

# wrap with a WSGI application
app = socketio.WSGIApp(sio)

@sio.event
def connect(sid, environ, auth):
    print('connect ', sid)

@sio.event
def disconnect(sid):
    print('disconnect ', sid)


def main():
    distance = 0

    lastTime = datetime.datetime.now()
    while True:
        period = datetime.datetime.now()

        if period.second % 30 == 0 and (period - lastTime).total_seconds() >= 1:
            # distance = getDistance()
            print(period)
            lastTime = period


if __name__ == '__main__':
    print('starting...')
    eventlet.wsgi.server(eventlet.listen(('', 3000)), app)
    main()


# import asyncio

# import pathlib

# import ssl

# import websockets


# async def hello(websocket):

#     name = await websocket.recv()

#     print(f"<<< {name}")


#     greeting = f"Hello {name}!"


#     await websocket.send(greeting)

#     print(f">>> {greeting}")


# ssl_context = ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER)

# localhost_pem = pathlib.Path(__file__).with_name("localhost.pem")

# ssl_context.load_cert_chain(localhost_pem)


# async def main():

#     async with websockets.serve(hello, "localhost", 8765, ssl=ssl_context, cors_allowed_origins='*'):

#         await asyncio.Future()  # run forever


# if __name__ == "__main__":

#     asyncio.run(main())

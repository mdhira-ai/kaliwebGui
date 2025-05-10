# import asyncio


# async def run_task1(websocket):
#     for i in range(10):
#         await websocket.broadcast("output_task1",data={
#             "message": i,
            
#         })
#         await asyncio.sleep(1)


# async def run_task2(websocket):
#     for i in range(10):
#         await websocket.broadcast("output_task2",data={
#             "message": i
#         })
#         await asyncio.sleep(1)




            # if data["data_type"] == "run_task1":
            #     task1 = asyncio.create_task(run_task1(socketconn))
            #     print(f"Task 1 PID: {task1.get_name()}")
                

            # if data["data_type"] == "run_task2":
            #     task2 = asyncio.create_task(run_task2(socketconn))
            #     print(f"Task 2 PID: {task2.get_name()}")

            # if data["data_type"] == "run_task1_stop":
            #     if task1 and not task1.done():
            #         task1.cancel()
            #         try:
            #             await task1
            #         except asyncio.CancelledError:
            #             print("Task 1 cancelled")

# class NmapRunner:
#     def __init__(self):
#         self.task1 = None
#         pass

#     async def mytask(self):
#         for i in range(10):
#             print(i)
#             await asyncio.sleep(1)

#     async def run(self, target: str):
#         # Split input into target and arguments
#         # parts = target.split()
#         # target_ip = parts[0]
#         # args = parts[1:] if len(parts) > 1 else []

#         # cmd = ["sudo", "nmap", target_ip] + args
#         # print(cmd)

#         self.task1 = asyncio.create_task(self.mytask())

#         print(f'PID {self.task1.get_name()}')

#         return self.task1.get_name()

#     async def stop(self):
#         if self.task1 is not self.task1.done():
#             self.task1.cancel()
#             try:
#                 await self.task1

#             except asyncio.CancelledError:
#                 print(f' {self.task1.get_name()} cancelled')

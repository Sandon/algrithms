test1 = 'haha'
test2 = 'xixi'
print ({test1, test2})
print ({'test1': test1, 'test2': test2})

def fn ():
    return {'x': 'y'}

val = fn()
print (val)

str = 'xyz'
r = str[::-1]
print (r)

objHaha = {1: 'y'}
print(not('z' in objHaha))
print(1 in objHaha)
print('---------')
for i in range(3, 1, -1):
    print(i)

print('ba' < 'ab')
print(str[1:2])
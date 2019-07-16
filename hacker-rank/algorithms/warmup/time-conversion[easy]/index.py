#!/usr/bin/python3

print("Hello, World!")

def timeConversion(s):
    #
    # Write your code here.
    #
    parts = s.split(':')
    hour = parts[0]
    minute = parts[1]
    second = parts[2][0:2]
    tag = parts[2][2:4]
    # print(hour, minute, second, tag)
    if tag == 'AM' and hour == '12':
        hour = '00'
    if tag == 'PM' and hour != '12':
        hour = int(hour) + 12

    return str(hour) + ':' + minute + ':' + second


print(timeConversion('07:05:45PM'))
print(timeConversion('07:05:45AM'))
print(timeConversion('12:05:45AM'))
print(timeConversion('12:05:45PM'))

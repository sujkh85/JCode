###리눅스 메모리 확인 커멘드###

    ps -eo user,pid,ppid,rss,size,vsize,pmem,pcpu,time,cmd --sort -rss | grep server.js

###nginx메모리 확인###
    ps aux | grep nginx | awk '{print $6}' | awk '{total=total +$1} END {print total / 1024}'

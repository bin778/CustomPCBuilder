from django.shortcuts import render
from django.http import HttpResponse
from konlpy.tag import Hannanum

hannanum = Hannanum()

# 게임용 견적 키워드
lol = hannanum.morphs("LOL용 롤용 리그오브레전드용")
fifa4 = hannanum.morphs("피파4용 피파용 피파온라인4용 피파온라인용")
pubg = hannanum.morphs("배그용 배틀그라운드용 PUBG용")
cp = hannanum.morphs("사이버펑크용 사펑용")
gb = hannanum.morphs("게임방송용 BJ용")

# 가정용 견적 키워드
web = hannanum.morphs("웹서핑용 인터넷검색용 가정용")
video = hannanum.morphs("영상시청용 인강용 인터넷강의용 동영상강의용")
slim = hannanum.morphs("슬림용 미니용")

# 작업용 견적 키워드
office = hannanum.morphs("사무용 문서작업용")
coding = hannanum.morphs("개발용 코딩용")
edit = hannanum.morphs("동영상편집용 영상편집용")
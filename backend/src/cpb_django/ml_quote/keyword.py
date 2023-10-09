from django.shortcuts import render
from django.http import HttpResponse
from konlpy.tag import Hannanum

hannanum = Hannanum()

# 게임용 견적 키워드
lol = hannanum.nouns("롤용 리그오브레전드용")
fifa4 = hannanum.nouns("피파4용 피파용 피온용")
pubg = hannanum.nouns("배그용 배틀그라운드용")
cp = hannanum.nouns("사이버펑크용 사펑용")
gb = hannanum.nouns("게임방송용 스트리머용")

# 가정용 견적 키워드
web = hannanum.nouns("웹서핑용 인터넷검색용 가정용")
vwatch = hannanum.nouns("영상시청용 인강용 인터넷강의용")
slim = hannanum.nouns("슬림용 미니용")

# 작업용 견적 키워드
office = hannanum.nouns("사무용 문서작업용")
coding = hannanum.nouns("개발용 개발자용 코딩용")
vedit = hannanum.nouns("동영상편집용 영상편집용")

def main(request):
  # 게임용 키워드 출력
  print(lol)
  print(fifa4)
  print(pubg)
  print(cp)
  print(gb)

  # 가정용 키워드 출력
  print(web)
  print(vwatch)
  print(slim)

  # 작업용 키워드 출력
  print(office)
  print(coding)
  print(vedit)

  return HttpResponse("KoNNPy를 사용한 키워드 추출")
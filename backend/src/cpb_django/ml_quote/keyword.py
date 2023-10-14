from django.shortcuts import render
from django.http import HttpResponse
from konlpy.tag import Hannanum

hannanum = Hannanum()

# 게임용 견적 키워드
lol = hannanum.nouns("롤용 리그오브레전드용")
fifa4 = hannanum.nouns("피파4용 피파용 피온용")
pubg = hannanum.nouns("배그용 배틀그라운드용")
gbroad = hannanum.nouns("게임방송용 스트리머용")

# 가정용 견적 키워드
web = hannanum.nouns("웹서핑용 인터넷검색용 가정용")
vwatch = hannanum.nouns("영상시청용 인강용 인터넷강의용")
office = hannanum.nouns("사무용 문서작업용")

# 작업용 견적 키워드
coding = hannanum.nouns("개발용 개발자용 코딩용")
vedit = hannanum.nouns("동영상편집용 영상편집용")

# 기타 견적 키워드
slim = hannanum.nouns("슬림형 미니형")
noise = hannanum.nouns("저소음 무소음")

def main(request):
  # 게임용 견적 출력
  # print(lol)
  # print(fifa4)
  # print(pubg)
  # print(gbroad)

  # 가정용 견적 출력
  # print(web)
  # print(vwatch)
  # print(office)
  
  # 작업용 견적 출력
  # print(coding)
  # print(vedit)

  # 기타 견적 출력
  # print(slim)
  # print(noise)

  return HttpResponse(
    f"게임용 {lol} {fifa4} {pubg} {gbroad}" + 
    f"가정용 {web} {vwatch} {office}" +
    f"작업용 {coding} {vedit}" + 
    f"기타 {slim} {noise}"
  )
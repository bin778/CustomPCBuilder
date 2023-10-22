from django.shortcuts import render
from django.http import HttpResponse
from konlpy.tag import Hannanum
import json

from .models import Cpu

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

# 키워드 매핑 함수
# def mappingKeyword():

# 키워드 검색 함수
def searchKeyword(keyword):
    if (keyword == lol[0] or keyword == lol[1]):
      print(lol)
    elif (keyword == fifa4[0] or keyword == fifa4[1] or keyword == fifa4[2]):
      print(fifa4)
    elif (keyword == pubg[0] or keyword == pubg[1]):
      print(pubg)
    elif (keyword == gbroad[0] or keyword == gbroad[1]):
      print(gbroad)

    if (keyword == web[0] or keyword == web[1] or keyword == web[2]):
      print(web)
    elif (keyword == vwatch[0] or keyword == vwatch[1] or keyword == vwatch[2]):
      print(vwatch)
    elif (keyword == office[0] or keyword == office[1]):
      print(office)

    if (keyword == coding[0] or keyword == coding[1] or keyword == coding[2]):
      print(coding)
    elif (keyword == vedit[0] or keyword == vedit[1]):
      print(vedit)

    if (keyword == slim[0] or keyword == slim[1]):
      print(slim)
    elif (keyword == noise[0] or keyword == noise[1]):
      print(noise)

# 메인 함수
def main(request):
  if request.method == 'GET':
      keyword = request.GET.get('keyword')
      print(keyword)

  # MySQL 데이터를 불러오기(필터 사용)
  intel_cpu = Cpu.objects.filter(cpu_manufacturer="인텔")
  for intel in intel_cpu:
    print(intel.cpu_title)
  
  core6_cpu = Cpu.objects.filter(cpu_core=6)
  for core6 in core6_cpu:
    print(core6.cpu_title)

  searchKeyword(keyword)

  return HttpResponse(json.dumps({'message': 'Success'}), content_type="application/json")
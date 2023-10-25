from django.shortcuts import render
from django.http import HttpResponse
from konlpy.tag import Hannanum
import json

from .models import Cpu
# from .models import Cooler
from .models import Mainboard
from .models import Memory
from .models import Videocard
from .models import Storage
# from .models import Power
from .models import Comcase

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
def mappingKeyword(keyword):
  # 사양 설정하기
  if (keyword == "피파4용" or keyword == "롤용" or keyword == "웹서핑용" or  keyword == "영상시청용" or  keyword == "사무용"):
    cpu = Cpu.objects.filter(cpu_manufacturer="인텔", cpu_core=4)
    if (keyword == "피파4용"):
      videocard = Videocard.objects.filter(videocard_chipset="GTX1660 SUPER")
    elif (keyword == "롤용" or keyword == "영상시청용"):
      videocard = Videocard.objects.filter(videocard_chipset="GTX1650")
    mainboard = Mainboard.objects.filter(mainboard_chipset="H610")
    memory = Memory.objects.filter(memory_manufacturer="삼성전자", memory_capacity=16)
  elif (keyword == "배그용"):
    cpu = Cpu.objects.filter(cpu_manufacturer="인텔", cpu_core=6)
    videocard = Videocard.objects.filter(videocard_chipset="RTX4060Ti")
    mainboard = Mainboard.objects.filter(mainboard_chipset="H610")
    memory = Memory.objects.filter(memory_manufacturer="삼성전자", memory_capacity=32)
  elif (keyword == "게임방송용"):
    cpu = Cpu.objects.filter(cpu_manufacturer="AMD", cpu_core=6)
    videocard = Videocard.objects.filter(videocard_chipset="RTX4070Ti")
    mainboard = Mainboard.objects.filter(mainboard_manufacturer="MSI", mainboard_chipset="A620")
    memory = Memory.objects.filter(memory_manufacturer="삼성전자", memory_capacity=32)
  elif (keyword == "코딩용" or keyword == "영상편집용"):
    cpu = Cpu.objects.filter(cpu_manufacturer="인텔", cpu_core=12)
    if (keyword == "코딩용"):
      videocard = Videocard.objects.filter(videocard_chipset="GTX1660 SUPER")
    elif (keyword == "영상편집용"):
      videocard = Videocard.objects.filter(videocard_chipset="RTX4060Ti")
    mainboard = Mainboard.objects.filter(mainboard_chipset="B760")
    memory = Memory.objects.filter(memory_manufacturer="삼성전자", memory_capacity=32)
  
  # 저장공간 설정
  if (keyword == "웹서핑용" or keyword == "영상시청용" or keyword == "사무용"):
    storage = Storage.objects.filter(storage_device="HDD", storage_capacity="2TB")
  else:
    storage = Storage.objects.filter(storage_device="SSD", storage_capacity="500GB")

  # 케이스 설정
  if (keyword == "웹서핑용" or keyword == "영상시청용" or keyword == "사무용" or keyword == "롤용" or keyword == "피파4용"):
    comcase = Comcase.objects.filter(comcase_manufacturer="3RSYS" ,comcase_size="미니타워")
  else:
    comcase = Comcase.objects.filter(comcase_manufacturer="마이크로닉스" ,comcase_size="미들타워")
  
  # 예외 처리
  if (keyword == "용도"):
    cpu = Cpu.objects.filter(cpu_manufacturer="용도")
    videocard = Videocard.objects.filter(videocard_manufacturer="용도")
    mainboard = Mainboard.objects.filter(mainboard_manufacturer="용도")
    memory = Memory.objects.filter(memory_manufacturer="용도")
    storage = Storage.objects.filter(storage_manufacturer="용도")
    comcase = Comcase.objects.filter(comcase_manufacturer="용도")
  
  # 사양 출력(임시 테스트)
  print("\n" + keyword + " 컴퓨터 견적")
  for cpu in cpu:
    print("CPU: " + cpu.cpu_title)
  for mainboard in mainboard:
    print("메인보드: " + mainboard.mainboard_title)
  for memory in memory:
    print("메모리: " + memory.memory_title)
  for videocard in videocard:
    print("비디오카드: " + videocard.videocard_title)
  for storage in storage:
    print("저장공간: " + storage.storage_title)
  for comcase in comcase:
    print("케이스: " + comcase.comcase_title)
  
  return cpu, mainboard, memory, videocard, storage, comcase
    

# 키워드 검색 함수
def searchKeyword(keyword):
  # 예외 처리
  usage = "용도"

  # 키워드 검색하기
  if (keyword == lol[0] or keyword == lol[1]):
    usage = "롤용"
  elif (keyword == fifa4[0] or keyword == fifa4[1] or keyword == fifa4[2]):
    usage = "피파4용"
  elif (keyword == pubg[0] or keyword == pubg[1]):
    usage = "배그용"
  elif (keyword == gbroad[0] or keyword == gbroad[1]):
    usage = "게임방송용"

  if (keyword == web[0] or keyword == web[1] or keyword == web[2]):
    usage = "웹서핑용"
  elif (keyword == vwatch[0] or keyword == vwatch[1] or keyword == vwatch[2]):
    usage = "영상시청용"
  elif (keyword == office[0] or keyword == office[1]):
    usage = "사무용"

  if (keyword == coding[0] or keyword == coding[1] or keyword == coding[2]):
    usage = "코딩용"
  elif (keyword == vedit[0] or keyword == vedit[1]):
    usage = "영상편집용"

  if (keyword == slim[0] or keyword == slim[1]):
    usage = "슬림형"
  elif (keyword == noise[0] or keyword == noise[1]):
    usage = "저소음"
  return usage

# 메인 함수
def main(request):
  if request.method == 'GET':
    keyword = request.GET.get('keyword')

  usage_keyword = searchKeyword(keyword)
  print(mappingKeyword(usage_keyword))

  return HttpResponse(json.dumps({'message': 'Success'}), content_type="application/json")
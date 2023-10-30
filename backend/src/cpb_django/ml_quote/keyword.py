from django.shortcuts import render
from django.http import HttpResponse
from konlpy.tag import Hannanum
import json

from .models import Cpu
from .models import Cooler
from .models import Mainboard
from .models import Memory
from .models import Videocard
from .models import Storage
from .models import Power
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
    cpus = Cpu.objects.filter(cpu_manufacturer="인텔", cpu_core=4)
    if (keyword == "피파4용"):
      videocards = Videocard.objects.filter(videocard_chipset="GTX1660 SUPER")
    elif (keyword == "롤용" or keyword == "영상시청용"):
      videocards = Videocard.objects.filter(videocard_chipset="GTX1650")
    mainboards = Mainboard.objects.filter(mainboard_chipset="H610")
    memories = Memory.objects.filter(memory_manufacturer="삼성전자", memory_capacity=16)
  elif (keyword == "배그용"):
    cpus = Cpu.objects.filter(cpu_manufacturer="인텔", cpu_core=6)
    videocards = Videocard.objects.filter(videocard_chipset="RTX4060Ti")
    mainboards = Mainboard.objects.filter(mainboard_chipset="H610")
    memories = Memory.objects.filter(memory_manufacturer="삼성전자", memory_capacity=32)
  elif (keyword == "게임방송용"):
    cpus = Cpu.objects.filter(cpu_manufacturer="AMD", cpu_core=6)
    videocards = Videocard.objects.filter(videocard_chipset="RTX4070Ti")
    mainboards = Mainboard.objects.filter(mainboard_manufacturer="MSI", mainboard_chipset="A620")
    memories = Memory.objects.filter(memory_manufacturer="삼성전자", memory_capacity=32)
  elif (keyword == "코딩용" or keyword == "영상편집용"):
    cpus = Cpu.objects.filter(cpu_manufacturer="인텔", cpu_core=12)
    if (keyword == "코딩용"):
      videocards = Videocard.objects.filter(videocard_chipset="GTX1660 SUPER")
    elif (keyword == "영상편집용"):
      videocards = Videocard.objects.filter(videocard_chipset="RTX4060Ti")
    mainboards = Mainboard.objects.filter(mainboard_chipset="B760")
    memories = Memory.objects.filter(memory_manufacturer="삼성전자", memory_capacity=32)
  # 키워드 입력 예외 처리(지정한 키워드를 입력하지 않은 경우)
  elif (keyword == "용도"): 
    return("키워드를 제대로 입력하세요!")
  
  # 저장공간 설정
  if (keyword == "웹서핑용" or keyword == "영상시청용" or keyword == "사무용"):
    storages = Storage.objects.filter(storage_device="HDD", storage_capacity="2TB")
  else:
    storages = Storage.objects.filter(storage_device="SSD", storage_capacity="500GB")

  # 케이스 설정
  if (keyword == "웹서핑용" or keyword == "영상시청용" or keyword == "사무용" or keyword == "롤용" or keyword == "피파4용"):
    comcases = Comcase.objects.filter(comcase_manufacturer="3RSYS", comcase_size="미니타워")
  else:
    comcases = Comcase.objects.filter(comcase_manufacturer="마이크로닉스", comcase_size="미들타워")
  
  # 쿨러 설정
  if (keyword == "롤용" or keyword == "피파4용" or keyword == "코딩용" or keyword == "영상편집용"):
    coolers = Cooler.objects.filter(cooler_manufacturer="쿨러마스터", cooler_cooling="공랭")
  elif (keyword == "배그용" or keyword == "게임방송용"):
    coolers = Cooler.objects.filter(cooler_manufacturer="3RSYS", cooler_cooling="수랭")

  # PC 부품 전력량 및 가격 계산
  total_wattage = 0
  total_price = 0
  
  for cpu in cpus:
    total_wattage += cpu.cpu_wattage
    total_price += cpu.cpu_price
  if (keyword != "웹서핑용" and keyword != "영상시청용" and keyword != "사무용"):
    for cooler in coolers:
      total_wattage += cooler.cooler_wattage
      total_price += cooler.cooler_price
  for mainboard in mainboards:
    total_wattage += mainboard.mainboard_wattage
    total_price += mainboard.mainboard_price
  for memory in memories:
    total_wattage += memory.memory_wattage
    total_price += memory.memory_price
  if (keyword != "웹서핑용" and keyword != "사무용"):
    for videocard in videocards:
      total_wattage += videocard.videocard_wattage
      total_price += videocard.videocard_price
  for storage in storages:
    total_wattage += storage.storage_wattage
    total_price += storage.storage_price
  for comcase in comcases:
    total_price += comcase.comcase_price

  # 파워 설정 및 가격 계산
  if (total_wattage < 300):
    powers = Power.objects.filter(power_formfactors="ATX", power_output=600)
  elif (total_wattage >= 300 and total_wattage < 400):
    powers = Power.objects.filter(power_formfactors="ATX", power_output=700)
  elif (total_wattage >= 400):
    powers = Power.objects.filter(power_formfactors="ATX", power_output=850)
  
  for power in powers:
    total_price += power.power_price
  
  quote_list = []
  quote_price = []
  quote_image = []
  
  # 설정한 사양을 리스트에 집어넣기
  for cpu in cpus:
    quote_list.append(cpu.cpu_title)
    quote_price.append(cpu.cpu_price)
    quote_image.append(cpu.cpu_image)
  if (keyword != "웹서핑용" and keyword != "영상시청용" and keyword != "사무용"):
    for cooler in coolers:
      quote_list.append(cooler.cooler_title)
      quote_price.append(cooler.cooler_price)
      quote_image.append(cooler.cooler_image)
  for mainboard in mainboards:
    quote_list.append(mainboard.mainboard_title)
    quote_price.append(mainboard.mainboard_price)
    quote_image.append(mainboard.mainboard_image)
  for memory in memories:
    quote_list.append(memory.memory_title)
    quote_price.append(memory.memory_price)
    quote_image.append(memory.memory_image)
  if (keyword != "웹서핑용" and keyword != "사무용"):
    for videocard in videocards:
      quote_list.append(videocard.videocard_title)
      quote_price.append(videocard.videocard_price)
      quote_image.append(videocard.videocard_image)
  for storage in storages:
    quote_list.append(storage.storage_title)
    quote_price.append(storage.storage_price)
    quote_image.append(storage.storage_image)
  for power in powers:
    quote_list.append(power.power_title)
    quote_price.append(power.power_price)
    quote_image.append(power.power_image)
  for comcase in comcases:
    quote_list.append(comcase.comcase_title)
    quote_price.append(comcase.comcase_price)
    quote_image.append(comcase.comcase_image)

  quote_total_wattage = [total_wattage]
  quote_total_price = [total_price]
  
  # 설정한 사양을 반환하기
  return quote_list, quote_price, quote_image, quote_total_wattage, quote_total_price
    
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
  mappping_quote = mappingKeyword(usage_keyword)

  return HttpResponse(mappping_quote)
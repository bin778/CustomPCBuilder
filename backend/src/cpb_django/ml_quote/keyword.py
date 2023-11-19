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

user_keyword = Hannanum()

# 게임용 견적 키워드
lol = user_keyword.morphs("롤 리그오브레전드")
fifa = user_keyword.morphs("피파 피온")
pubg = user_keyword.morphs("배그 배틀그라운드")
bj = user_keyword.morphs("게임방송 겜방 스트리머")

# 가정용 견적 키워드
web = user_keyword.morphs("웹서핑 인터넷 검색")
video = user_keyword.morphs("인강 영상시청 강의")

# 작업용 견적 키워드
office = user_keyword.morphs("사무 엑셀 문서")
coding = user_keyword.morphs("코딩 프로그래 개발")
premier = user_keyword.morphs("영상편집 프리미어 영상작업")

# 기타 견적 키워드
slim = user_keyword.morphs("슬림 미니")
noise = user_keyword.morphs("저소음 무소음")
black = user_keyword.morphs("검은색 검정색")
white = user_keyword.morphs("하양색 흰색")

# 키워드 매핑 함수
def mappingKeyword(usage):
  # 부품 성능 비교를 위한 임시 저장
  cpus = []
  memories = []
  videocards = []

  for keyword in usage:
    # CPU, 그래픽카드 사양 설정하기
    if (keyword == "피파4용" or keyword == "롤용" or keyword == "웹서핑용" or keyword == "영상시청용" or  keyword == "사무용"):
      cpus.extend(Cpu.objects.filter(cpu_manufacturer="인텔", cpu_core=4))
      if (keyword == "피파4용" or keyword == "롤용"):
        videocards.extend(Videocard.objects.filter(videocard_chipset="GTX1660 SUPER"))
      elif (keyword == "영상시청용"):
        videocards.extend(Videocard.objects.filter(videocard_chipset="GTX1650"))
      memories.extend(Memory.objects.filter(memory_manufacturer="삼성전자", memory_capacity=16))
    elif (keyword == "배그용"):
      cpus.extend(Cpu.objects.filter(cpu_manufacturer="인텔", cpu_core=6))
      videocards.extend(Videocard.objects.filter(videocard_chipset="RTX4060Ti"))
      memories.extend(Memory.objects.filter(memory_manufacturer="삼성전자", memory_capacity=32))
    elif (keyword == "게임방송용"):
      cpus.extend(Cpu.objects.filter(cpu_manufacturer="AMD", cpu_core=6))
      videocards.extend(Videocard.objects.filter(videocard_chipset="RTX4070Ti"))
      memories.extend(Memory.objects.filter(memory_manufacturer="삼성전자", memory_capacity=32))
    elif (keyword == "코딩용" or keyword == "영상편집용"):
      cpus.extend(Cpu.objects.filter(cpu_manufacturer="인텔", cpu_core=12))
      if (keyword == "코딩용"):
        videocards.extend(Videocard.objects.filter(videocard_chipset="GTX1660 SUPER"))
      elif (keyword == "영상편집용"):
        videocards.extend(Videocard.objects.filter(videocard_chipset="RTX4060Ti"))
      memories.extend(Memory.objects.filter(memory_manufacturer="삼성전자", memory_capacity=32))   

  # CPU, 그래픽카드, 메모리 성능 비교하기
  try: # 입력한 키워드의 범위를 벗어난 경우 예외처리한다.
    cpu_max = cpus[0].cpu_benchmark
  except (ValueError, IndexError):
    return "exception"
  try:
    videocard_max = videocards[0].videocard_benchmark
  except (ValueError, IndexError):
    videocard_max = None
  memory_max = memories[0].memory_capacity

  for cpu in cpus:
    if (cpu.cpu_benchmark > cpu_max):
      cpu_max = cpu.cpu_benchmark
  for videocard in videocards:
    if (videocard.videocard_benchmark > videocard_max):
      videocard_max = videocard.videocard_benchmark
  for memory in memories:
    if (memory.memory_capacity > memory_max):
      memory_max = memory.memory_capacity
  
  # CPU, 메인보드 세팅
  if (cpu_max == 13520): 
    cpus_set = Cpu.objects.filter(cpu_manufacturer="인텔", cpu_core=4)
    mainboards_set = Mainboard.objects.filter(mainboard_chipset="H610")
  elif (cpu_max == 19474): 
    cpus_set = Cpu.objects.filter(cpu_manufacturer="인텔", cpu_core=6)
    mainboards_set = Mainboard.objects.filter(mainboard_chipset="H610")
  elif (cpu_max == 34742): 
    cpus_set = Cpu.objects.filter(cpu_manufacturer="인텔", cpu_core=12)
    mainboards_set = Mainboard.objects.filter(mainboard_chipset="B760")
  elif (cpu_max == 28767): 
    cpus_set = Cpu.objects.filter(cpu_manufacturer="AMD", cpu_core=6)
    mainboards_set = Mainboard.objects.filter(mainboard_manufacturer="MSI", mainboard_chipset="A620")
  elif (cpu_max == 39255): 
    cpus_set = Cpu.objects.filter(cpu_manufacturer="AMD", cpu_core=12)
    mainboards_set = Mainboard.objects.filter(mainboard_chipset="X570")

  # 그래픽카드 세팅
  if (videocard_max == 7860): videocards_set = Videocard.objects.filter(videocard_chipset="GTX1650")
  elif (videocard_max == 12784): videocards_set = Videocard.objects.filter(videocard_chipset="GTX1660 SUPER")
  elif (videocard_max == 17117): videocards_set = Videocard.objects.filter(videocard_chipset="RTX3060")
  elif (videocard_max == 22544): videocards_set = Videocard.objects.filter(videocard_chipset="RTX4060Ti")
  elif (videocard_max == 31649): videocards_set = Videocard.objects.filter(videocard_chipset="RTX4070Ti")
  elif (videocard_max == 34727): videocards_set = Videocard.objects.filter(videocard_chipset="RTX4080")

  # 메모리 세팅
  if (memory_max == 16): memoires_set = Memory.objects.filter(memory_manufacturer="삼성전자", memory_capacity=16)
  elif (memory_max == 32): memoires_set = Memory.objects.filter(memory_manufacturer="삼성전자", memory_capacity=32)

  # 저장공간 설정
  if (cpu_max == 13520):
    storages_set = Storage.objects.filter(storage_device="HDD", storage_capacity="2TB")
  elif (cpu_max == 19474 or cpu_max == 28767):
    storages_set = Storage.objects.filter(storage_device="SSD", storage_capacity="500GB")
  elif (cpu_max == 34742 or cpu_max == 39255 or videocard_max == 31649 or videocard_max == 34727):
    storages_set = Storage.objects.filter(storage_device="SSD", storage_capacity="1TB")

  # 케이스 설정
  if (cpu_max == 13520):
    comcases_set = Comcase.objects.filter(comcase_manufacturer="3RSYS", comcase_size="미니타워")
  elif (cpu_max == 19474 or cpu_max == 28767 or cpu_max == 34742 or cpu_max == 39255):
    comcases_set = Comcase.objects.filter(comcase_manufacturer="마이크로닉스", comcase_size="미들타워")
  
  # 쿨러 설정
  if (videocard_max == 12784 or videocard_max == 17117 or videocard_max == 22544):
    coolers_set = Cooler.objects.filter(cooler_manufacturer="쿨러마스터", cooler_cooling="공랭")
  elif (videocard_max == 31649 or videocard_max == 34727):
    coolers_set = Cooler.objects.filter(cooler_manufacturer="3RSYS", cooler_cooling="수랭")
  else:
    coolers_set = None
  
  # 기타 설정
  for keyword in usage:
    if (keyword == "저소음"):
      if (videocard_max == 12784 or videocard_max == 17117 or videocard_max == 22544):
        coolers_set = Cooler.objects.filter(cooler_manufacturer="3RSYS", cooler_cooling="수랭")
      elif (videocard_max == 7860): 
        coolers_set = Cooler.objects.filter(cooler_manufacturer="쿨러마스터", cooler_cooling="공랭")
    if (keyword == "슬림형"):
      if (videocard_max != 31649 and videocard_max != 34727):
        comcases_set = Comcase.objects.filter(comcase_manufacturer="3RSYS", comcase_size="미니타워")

  # 색상 설정  
  for keyword in usage:
    if (keyword == "검정색"):
      if (cpu_max == 13520):
        comcases_set = Comcase.objects.filter(comcase_size="미니타워", comcase_color="black")
      elif (cpu_max == 19474 or cpu_max == 28767 or cpu_max == 34742 or cpu_max == 39255):
        comcases_set = Comcase.objects.filter(comcase_size="미들타워", comcase_color="black")
      for keyword2 in usage:
        if (keyword2 == "슬림형"):
          if (videocard_max != 31649 and videocard_max != 34727):
            comcases_set = Comcase.objects.filter(comcase_size="미니타워", comcase_color="black")
    elif (keyword == "흰색"):
      if (cpu_max == 13520):
        comcases_set = Comcase.objects.filter(comcase_size="미니타워", comcase_color="white")
      elif (cpu_max == 19474 or cpu_max == 28767 or cpu_max == 34742 or cpu_max == 39255):
        comcases_set = Comcase.objects.filter(comcase_size="미들타워", comcase_color="white")
      for keyword2 in usage:
        if (keyword2 == "슬림형"):
          if (videocard_max != 31649 and videocard_max != 34727):
            comcases_set = Comcase.objects.filter(comcase_size="미니타워", comcase_color="white")

  # PC 부품 전력량 및 가격 계산
  total_wattage = 0
  total_price = 0
  
  for cpu_set in cpus_set:
    total_wattage += cpu_set.cpu_wattage
    total_price += cpu_set.cpu_price
  if (coolers_set != None):
    for cooler_set in coolers_set:
      total_wattage += cooler_set.cooler_wattage
      total_price += cooler_set.cooler_price
  for mainboard_set in mainboards_set:
    total_wattage += mainboard_set.mainboard_wattage
    total_price += mainboard_set.mainboard_price
  for memory_set in memoires_set:
    total_wattage += memory_set.memory_wattage
    total_price += memory_set.memory_price
  if (videocard_max != None):
    for videocard_set in videocards_set:
      total_wattage += videocard_set.videocard_wattage
      total_price += videocard_set.videocard_price
  for storage_set in storages_set:
    total_wattage += storage_set.storage_wattage
    total_price += storage_set.storage_price
  for comcase_set in comcases_set:
    total_price += comcase_set.comcase_price

  # 파워 설정 및 가격 계산
  if (total_wattage < 300):
    powers_set = Power.objects.filter(power_formfactors="ATX", power_output=600)
  elif (total_wattage >= 300 and total_wattage < 400):
    powers_set = Power.objects.filter(power_formfactors="ATX", power_output=700)
  elif (total_wattage >= 400):
    powers_set = Power.objects.filter(power_formfactors="ATX", power_output=850)
  
  for power_set in powers_set:
    total_price += power_set.power_price
  
  quote_list = []
  quote_price = []
  quote_image = []
  
  # 설정한 사양을 리스트에 집어넣기
  for cpu_set in cpus_set:
    quote_list.append(cpu_set.cpu_title)
    quote_price.append(cpu_set.cpu_price)
    quote_image.append(cpu_set.cpu_image)
  if (coolers_set != None):
    for cooler_set in coolers_set:
      quote_list.append(cooler_set.cooler_title)
      quote_price.append(cooler_set.cooler_price)
      quote_image.append(cooler_set.cooler_image)
  for mainboard_set in mainboards_set:
    quote_list.append(mainboard_set.mainboard_title)
    quote_price.append(mainboard_set.mainboard_price)
    quote_image.append(mainboard_set.mainboard_image)
  for memory_set in memoires_set:
    quote_list.append(memory_set.memory_title)
    quote_price.append(memory_set.memory_price)
    quote_image.append(memory_set.memory_image)
  if (videocard_max != None):
    for videocard_set in videocards_set:
      quote_list.append(videocard_set.videocard_title)
      quote_price.append(videocard_set.videocard_price)
      quote_image.append(videocard_set.videocard_image)
  for storage_set in storages_set:
    quote_list.append(storage_set.storage_title)
    quote_price.append(storage_set.storage_price)
    quote_image.append(storage_set.storage_image)
  for power_set in powers_set:
    quote_list.append(power_set.power_title)
    quote_price.append(power_set.power_price)
    quote_image.append(power_set.power_image)
  for comcase_set in comcases_set:
    quote_list.append(comcase_set.comcase_title)
    quote_price.append(comcase_set.comcase_price)
    quote_image.append(comcase_set.comcase_image)

  quote_total_wattage = [total_wattage]
  quote_total_price = [total_price]
  
  # 설정한 사양을 반환하기
  return quote_list, quote_price, quote_image, quote_total_wattage, quote_total_price
    
# 키워드 검색 함수
def searchKeyword(keyword):
  # 예외 처리
  usage = []

  # 키워드 검색하기
  for i in lol:
    if (i in keyword): usage.append("롤용")
  for i in fifa:
    if (i in keyword): usage.append("피파4용")
  for i in pubg:
    if (i in keyword): usage.append("배그용")
  for i in bj:
    if (i in keyword): usage.append("게임방송용")
  for i in web:
    if (i in keyword): usage.append("웹서핑용")
  for i in video:
    if (i in keyword): usage.append("영상시청용")
  for i in office:
    if (i in keyword): usage.append("사무용")
  for i in coding:
    if (i in keyword): usage.append("코딩용")
  for i in premier:
    if (i in keyword): usage.append("영상편집용")
  for i in slim:
    if (i in keyword): usage.append("슬림형")
  for i in noise:
    if (i in keyword): usage.append("저소음")
  for i in black:
    if (i in keyword): usage.append("검정색")
  for i in white:
    if (i in keyword): usage.append("흰색")

  return usage

# 메인 함수
def main(request):
  if request.method == 'GET':
    keyword = request.GET.get('keyword')

  usage_keyword = searchKeyword(keyword)
  mappping_quote = mappingKeyword(usage_keyword)

  return HttpResponse(mappping_quote)
from django.shortcuts import render
from django.http import HttpResponse
from django.db import connection
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
  # 부품 성능 비교를 위한 임시 부품 Array(CPU 점수, 그래픽카드 점수, 메모리 용량)
  cpus_benchmark = []
  memories_capacity = []
  videocards_benchmark = []

  # 반환할 배열
  quote_list = []
  quote_price = []
  quote_image = []
  quote_total_wattage = 0
  quote_total_price = 0

  for keyword in usage:
    with connection.cursor() as cursor:
      # CPU 성능 비교를 위해 CPU 점수 설정하기
      cursor.execute("SELECT cpu.* FROM quote_setting JOIN cpu ON quote_setting.cpu_title = cpu.cpu_title where quote_keyword=%s", [keyword])
      cpu_rows = cursor.fetchall()
      for row in cpu_rows:
        cpus_benchmark.append(row[10])
      
      # 그래픽카드 성능 비교를 위해 그래픽카드 점수 설정하기
      cursor.execute("SELECT videocard.* FROM quote_setting JOIN videocard ON quote_setting.videocard_title = videocard.videocard_title where quote_keyword=%s", [keyword])
      videocard_rows = cursor.fetchall()
      for row in videocard_rows:
        videocards_benchmark.append(row[9])
      
      # 메모리 성능 비교를 위해 메모리 용량 설정하기
      cursor.execute("SELECT memory.* FROM quote_setting JOIN memory ON quote_setting.memory_title = memory.memory_title where quote_keyword=%s", [keyword])
      memories_rows = cursor.fetchall()
      for row in memories_rows:
        memories_capacity.append(row[4])

  # CPU, 그래픽카드, 메모리 성능 비교하기
  try: # 입력한 키워드의 범위를 벗어난 경우 예외처리한다.
    cpu_max = cpus_benchmark[0]
  except (ValueError, IndexError):
    return "exception"
  try:
    videocard_max = videocards_benchmark[0]
  except (ValueError, IndexError):
    videocard_max = None
  memory_max = memories_capacity[0]

  for cpu in cpus_benchmark:
    if (cpu > cpu_max):
      cpu_max = cpu
  for videocard in videocards_benchmark:
    if (videocard > videocard_max):
      videocard_max = videocard
  for memory in memories_capacity:
    if (memory > memory_max):
      memory_max = memory

  # CPU 세팅
  with connection.cursor() as cursor:
    cursor.execute("SELECT cpu_title, cpu_price, cpu_image, cpu_wattage FROM cpu where cpu_benchmark=%s", [cpu_max])
    cpu_list = cursor.fetchall()
  for list in cpu_list:
    cpu_title = list[0]
    quote_list.append(list[0])
    quote_price.append(list[1])
    quote_image.append(list[2])
    quote_total_wattage += list[3]
    quote_total_price += list[1]

  # 메인보드 세팅
  with connection.cursor() as cursor:
    cursor.execute("SELECT mainboard_title, mainboard_price, mainboard_image, mainboard_wattage FROM cpu JOIN mainboard ON cpu.cpu_chipset = mainboard.mainboard_chipset WHERE cpu_title=%s ORDER BY mainboard_price ASC LIMIT 1", [cpu_title])
    mainboard_list = cursor.fetchall()
  for list in mainboard_list:
    quote_list.append(list[0])
    quote_price.append(list[1])
    quote_image.append(list[2])
    quote_total_wattage += list[3]
    quote_total_price += list[1]

  # 그래픽카드 세팅
  with connection.cursor() as cursor:
    cursor.execute("SELECT videocard_title, videocard_price, videocard_image, videocard_wattage FROM videocard where videocard_benchmark=%s", [videocard_max])
    videocard_list = cursor.fetchall()
  for list in videocard_list:
    quote_list.append(list[0])
    quote_price.append(list[1])
    quote_image.append(list[2])
    quote_total_wattage += list[3]
    quote_total_price += list[1]

  # 메모리 세팅
  with connection.cursor() as cursor:
    cursor.execute("SELECT memory_title, memory_price, memory_image, memory_wattage FROM memory where memory_capacity=%s ORDER BY memory_price ASC LIMIT 1", [memory_max])
    memory_list = cursor.fetchall()
  for list in memory_list:
    quote_list.append(list[0])
    quote_price.append(list[1])
    quote_image.append(list[2])
    quote_total_wattage += list[3]
    quote_total_price += list[1]

  print(quote_list)
  print(quote_price)
  print(quote_image)
  print(quote_total_wattage)
  print(quote_total_price)

  # 저장공간 설정
  """if (cpu_max == 13520):
    storages_set = Storage.objects.filter(storage_device="HDD", storage_capacity="2TB")
  elif (cpu_max == 19474 or cpu_max == 28767):
    storages_set = Storage.objects.filter(storage_device="SSD", storage_capacity="500GB")
  elif (cpu_max == 34742 or cpu_max == 39255 or videocard_max == 31649 or videocard_max == 34727):
    storages_set = Storage.objects.filter(storage_device="SSD", storage_capacity="1TB")"""

  # 케이스 설정
  """if (cpu_max == 13520):
    comcases_set = Comcase.objects.filter(comcase_manufacturer="3RSYS", comcase_size="미니타워")
  elif (cpu_max == 19474 or cpu_max == 28767 or cpu_max == 34742 or cpu_max == 39255):
    comcases_set = Comcase.objects.filter(comcase_manufacturer="마이크로닉스", comcase_size="미들타워")"""
  
  # 쿨러 설정
  """if (videocard_max == 12784 or videocard_max == 17117 or videocard_max == 22544):
    coolers_set = Cooler.objects.filter(cooler_manufacturer="쿨러마스터", cooler_cooling="공랭")
  elif (videocard_max == 31649 or videocard_max == 34727):
    coolers_set = Cooler.objects.filter(cooler_manufacturer="3RSYS", cooler_cooling="수랭")
  else:
    coolers_set = None"""
  
  # 기타 설정
  """for keyword in usage:
    if (keyword == "저소음"):
      if (videocard_max == 12784 or videocard_max == 17117 or videocard_max == 22544):
        coolers_set = Cooler.objects.filter(cooler_manufacturer="3RSYS", cooler_cooling="수랭")
      elif (videocard_max == 7860): 
        coolers_set = Cooler.objects.filter(cooler_manufacturer="쿨러마스터", cooler_cooling="공랭")
    if (keyword == "슬림형"):
      if (videocard_max != 31649 and videocard_max != 34727):
        comcases_set = Comcase.objects.filter(comcase_manufacturer="3RSYS", comcase_size="미니타워")"""

  # 색상 설정  
  """for keyword in usage:
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
            comcases_set = Comcase.objects.filter(comcase_size="미니타워", comcase_color="white")"""

  # PC 부품 전력량 및 가격 계산
  """total_wattage = 0
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
    total_price += comcase_set.comcase_price"""

  # 파워 설정 및 가격 계산
  """if (total_wattage < 300):
    powers_set = Power.objects.filter(power_formfactors="ATX", power_output=600)
  elif (total_wattage >= 300 and total_wattage < 400):
    powers_set = Power.objects.filter(power_formfactors="ATX", power_output=700)
  elif (total_wattage >= 400):
    powers_set = Power.objects.filter(power_formfactors="ATX", power_output=850)"""
  
  """for power_set in powers_set:
    total_price += power_set.power_price"""
  
  """quote_list = []
  quote_price = []
  quote_image = []"""
  
  # 설정한 사양을 리스트에 집어넣기
  """for cpu_set in cpus_set:
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
  quote_total_price = [total_price]"""
  
  # 설정한 사양을 반환하기
  return quote_list, quote_price, quote_image, quote_total_wattage, quote_total_price
    
# 키워드 검색 함수
def searchKeyword(keyword):
  # 예외 처리
  usage = []

  # 키워드 검색하기
  for row in lol:
    if (row in keyword): usage.append("롤용")
  for row in fifa:
    if (row in keyword): usage.append("피파4용")
  for row in pubg:
    if (row in keyword): usage.append("배그용")
  for row in bj:
    if (row in keyword): usage.append("게임방송용")
  for row in web:
    if (row in keyword): usage.append("웹서핑용")
  for row in video:
    if (row in keyword): usage.append("영상시청용")
  for row in office:
    if (row in keyword): usage.append("사무용")
  for row in coding:
    if (row in keyword): usage.append("코딩용")
  for row in premier:
    if (row in keyword): usage.append("영상편집용")
  for row in slim:
    if (row in keyword): usage.append("슬림형")
  for row in noise:
    if (row in keyword): usage.append("저소음")
  for row in black:
    if (row in keyword): usage.append("검정색")
  for row in white:
    if (row in keyword): usage.append("흰색")

  return usage

# 메인 함수
def main(request):
  # if request.method == 'GET':
  #  keyword = request.GET.get('keyword')

  usage_keyword = searchKeyword("나는 영상편집 작업해야하는데 롤이나 배그도 심심하면 할 생각이고 엑셀 작업도 할거야!")
  mappping_quote = mappingKeyword(usage_keyword)

  return HttpResponse(mappping_quote)
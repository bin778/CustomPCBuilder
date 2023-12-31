from django.shortcuts import render
from django.http import HttpResponse
from django.db import connection
from enum import Enum
import json

# 게임용 견적 키워드
lol = ["롤","리그오브레전드","LOL"]
fifa = ["피파","피온"]
pubg = ["배그","배틀그라운드","PUBG"]
bj = ["스트리머","게임방송","유튜버","BJ","스팀"]

# 가정용 견적 키워드
web = ["웹서핑","인터넷","검색"]
video = ["인강","영상시청","강의"]

# 작업용 견적 키워드
office = ["사무","액셀","문서"]
coding = ["코딩","프로그래","개발"]
premier = ["영상편집","영상작업","프리미어","그래픽작업"]

# 기타 견적 키워드
slim = ["슬림","미니","초소형","가볍","가벼"]
noise = ["저소음","무소음"]
black = ["검정색","검정색","블랙"]
white = ["하양색","흰색","화이트"]

# 키워드 매핑 함수
def mappingKeyword(usage):
  # 부품 성능 비교를 위한 임시 부품 Array(CPU 점수, 그래픽카드 점수, 메모리 용량)
  cpus_benchmark = []
  memories_capacity = []
  videocards_benchmark = []
  cooling = "없음"

  # 기호 Boolean
  slim = False
  noise = False
  black = False
  white = False

  # 전력량 및 가격 계산
  quote_list = []
  quote_price = []
  quote_image = []
  quote_explain = []
  total_wattage = 0
  total_price = 0

  # 제품 Enum
  class Product(Enum):
    CPU = 1
    Cooler = 2
    Mainboard = 3
    Memory = 4
    Videocard = 5
    Storage = 6
    Case = 7
    Power = 8

  def AddList(product_name, product_list):
    # 지역 변수가 아니라는 것을 선언
    nonlocal total_wattage
    nonlocal total_price
    nonlocal cooling

    for list in product_list:
      quote_list.append(list[0])
      quote_price.append(list[1])
      quote_image.append(list[2])
      if (product_name != Product.Case.name and product_name != Product.Power.name):
        total_wattage += list[3]
      if (product_name == Product.CPU.name or product_name == Product.Videocard.name or product_name == Product.Memory.name):
        quote_explain.append(list[4])
      total_price += list[1]
      if (product_name == Product.Videocard.name):
        cooling = list[5]

    # 타이틀 반환하기
    if (product_name == Product.CPU.name or product_name == Product.Videocard.name):
      return list[0]

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
    
    # 사용자 기호 용도
    if (keyword == "슬림형"):
      slim = True
    elif (keyword == "저소음"):
      noise = True
    elif (keyword == "검정색"):
      black = True
    elif (keyword == "흰색"):
      white = True

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
    cursor.execute("SELECT cpu_title, cpu_price, cpu_image, cpu_wattage, cpu_explain FROM cpu where cpu_benchmark=%s", [cpu_max])
    cpu_list = cursor.fetchall()
  cpu_title = AddList(Product.CPU.name, cpu_list)
  
  # 메인보드 세팅
  with connection.cursor() as cursor:
    cursor.execute("SELECT mainboard_title, mainboard_price, mainboard_image, mainboard_wattage FROM cpu JOIN mainboard ON cpu.cpu_chipset = mainboard.mainboard_chipset WHERE cpu_title=%s ORDER BY mainboard_price ASC LIMIT 1", [cpu_title])
    mainboard_list = cursor.fetchall()
  AddList(Product.Mainboard.name, mainboard_list)

  # 그래픽카드 세팅
  if (videocard_max != None):
    with connection.cursor() as cursor:
      cursor.execute("SELECT videocard_title, videocard_price, videocard_image, videocard_wattage, videocard_explain, videocard_cooler_cooling FROM videocard where videocard_benchmark=%s", [videocard_max])
      videocard_list = cursor.fetchall()
    videocard_title = AddList(Product.Videocard.name, videocard_list)

  # 메모리 세팅
  with connection.cursor() as cursor:
    cursor.execute("SELECT memory_title, memory_price, memory_image, memory_wattage, memory_explain FROM memory where memory_capacity=%s ORDER BY memory_price ASC LIMIT 1", [memory_max])
    memory_list = cursor.fetchall()
  AddList(Product.Memory.name, memory_list)

  # 저장공간 설정
  with connection.cursor() as cursor:
    cursor.execute("SELECT storage_title, storage_price, storage_image, storage_wattage FROM cpu JOIN storage ON cpu.cpu_device = storage.storage_device WHERE cpu_title=%s ORDER BY storage_price ASC LIMIT 1", [cpu_title])
    storage_list = cursor.fetchall()
  AddList(Product.Storage.name, storage_list)

  # 케이스 설정
  if (videocard_max == None):
    if (black == True or (black == False and white == False)):
      with connection.cursor() as cursor:
        cursor.execute("SELECT comcase_title, comcase_price, comcase_image FROM comcase WHERE comcase_size=\"미니타워\" and comcase_color=\"black\" ORDER BY comcase_price ASC LIMIT 1")
        case_list = cursor.fetchall()
    elif (white == True):
      with connection.cursor() as cursor:
        cursor.execute("SELECT comcase_title, comcase_price, comcase_image FROM comcase WHERE comcase_size=\"미니타워\" and comcase_color=\"white\" ORDER BY comcase_price ASC LIMIT 1")
        case_list = cursor.fetchall()
  else:
    if (((slim == True and black == True) or (slim == True and black == False and white == False)) and videocard_title != "GeForce RTX 4070 Ti"):
      with connection.cursor() as cursor:
        cursor.execute("SELECT comcase_title, comcase_price, comcase_image FROM comcase WHERE comcase_size=\"미니타워\" and comcase_color=\"black\" ORDER BY comcase_price ASC LIMIT 1")
        case_list = cursor.fetchall()
    elif ((slim == True and white == True) and videocard_title != "GeForce RTX 4070 Ti"):
      with connection.cursor() as cursor:
        cursor.execute("SELECT comcase_title, comcase_price, comcase_image FROM comcase WHERE comcase_size=\"미니타워\" and comcase_color=\"white\" ORDER BY comcase_price ASC LIMIT 1")
        case_list = cursor.fetchall()
    elif (black == True):
      with connection.cursor() as cursor:
        cursor.execute("SELECT comcase_title, comcase_price, comcase_image FROM videocard JOIN comcase ON videocard.videocard_comcase_size = comcase.comcase_size WHERE videocard_title=%s and comcase_color=\"black\" ORDER BY comcase_price ASC LIMIT 1", [videocard_title])
        case_list = cursor.fetchall()
    elif (white == True):
      with connection.cursor() as cursor:
        cursor.execute("SELECT comcase_title, comcase_price, comcase_image FROM videocard JOIN comcase ON videocard.videocard_comcase_size = comcase.comcase_size WHERE videocard_title=%s and comcase_color=\"white\" ORDER BY comcase_price ASC LIMIT 1", [videocard_title])
        case_list = cursor.fetchall()
    else:
      with connection.cursor() as cursor:
        cursor.execute("SELECT comcase_title, comcase_price, comcase_image FROM videocard JOIN comcase ON videocard.videocard_comcase_size = comcase.comcase_size WHERE videocard_title=%s ORDER BY comcase_price ASC LIMIT 1", [videocard_title])
        case_list = cursor.fetchall()
  AddList(Product.Case.name, case_list)
  
  # 쿨러 설정
  if (videocard_max != None):
    if (cooling == "없음" and noise == True):
      with connection.cursor() as cursor:
        cursor.execute("SELECT cooler_title, cooler_price, cooler_image, cooler_wattage FROM cooler WHERE cooler_cooling=\"공랭\" ORDER BY cooler_price ASC LIMIT 1")
        cooler_list = cursor.fetchall()
    elif (cooling == "공랭" and noise == True):
      with connection.cursor() as cursor:
        cursor.execute("SELECT cooler_title, cooler_price, cooler_image, cooler_wattage FROM cooler WHERE cooler_cooling=\"수랭\" ORDER BY cooler_price ASC LIMIT 1")
        cooler_list = cursor.fetchall()
    else:
      with connection.cursor() as cursor:
        cursor.execute("SELECT cooler_title, cooler_price, cooler_image, cooler_wattage FROM videocard JOIN cooler ON videocard.videocard_cooler_cooling = cooler.cooler_cooling WHERE videocard_title=%s ORDER BY cooler_price ASC LIMIT 1", [videocard_title])
        cooler_list = cursor.fetchall()
    AddList(Product.Cooler.name, cooler_list)

  # 파워 설정
  if (total_wattage < 300):
    with connection.cursor() as cursor:
      cursor.execute("SELECT power_title, power_price, power_image FROM power WHERE power_output=600 and power_formfactors=\"ATX\" ORDER BY power_price LIMIT 1;")
      power_list = cursor.fetchall()
  elif (total_wattage >= 300 and total_wattage < 400):
    with connection.cursor() as cursor:
      cursor.execute("SELECT power_title, power_price, power_image FROM power WHERE power_output=700 and power_formfactors=\"ATX\" ORDER BY power_price LIMIT 1;")
      power_list = cursor.fetchall()
  elif (total_wattage >= 400):
    with connection.cursor() as cursor:
      cursor.execute("SELECT power_title, power_price, power_image FROM power WHERE power_output=850 and power_formfactors=\"ATX\" ORDER BY power_price LIMIT 1;")
      power_list = cursor.fetchall()
  AddList(Product.Power.name, power_list)

  quote_total_wattage = []
  quote_total_price = []

  quote_total_wattage.append(total_wattage)
  quote_total_price.append(total_price)
  
  # 설정한 사양을 반환하기
  return quote_list, quote_price, quote_image, quote_explain, quote_total_wattage, quote_total_price
    
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
  if request.method == 'GET':
   keyword = request.GET.get('keyword')

  usage_keyword = searchKeyword(keyword)
  mappping_quote = mappingKeyword(usage_keyword)

  return HttpResponse(mappping_quote)
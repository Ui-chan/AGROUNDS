from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
# from .models import User_info
from DB.models import UserInfo
from .serializers import *
from staticfiles.get_user_info_from_token import get_user_code_from_token

class getPlayerInfo(APIView):
    def post(self, request):
        data = request.data
        try:
            user_code = data['user_code']
            user_info = UserInfo.objects.get(user_code=user_code)
        except KeyError as e :
            return Response({"error": f"Missing required field: {str(e)}"}, status=400)
        except UserInfo.DoesNotExist :
            return Response({"error": f"user_code({user_code})에 해당하는 유저가 존재하지 않습니다."}, status=404)
        
        serializer = Essencial_Player_Info(user_info)

        return Response(serializer.data)

class joinTeam(APIView):
    def post(self, request):
        request_data = request.data.copy()
        request_data['direction'] = 'user_to_team'
        
        serializer = Pending_Invite_Team_Serializer(data = request_data)
        
        if serializer.is_valid():
            serializer.save()
            return Response({"result" : "success"})
        else:
            return Response(serializer.errors, status=400)

class searchIndividualPlayerByNickname(APIView):
    def post(self, request):
        auth_header = request.headers.get('Authorization')
        if auth_header is None:
            return Response({'detail': 'Authorization header missing or invalid'}, status=status.HTTP_401_UNAUTHORIZED)
        token = auth_header.split(' ')[0]

        user_code = get_user_code_from_token(token)
        if user_code is None:
            return Response({'error' : '토큰 만료 : 다시 로그인해주세요'}, status=403)
        

        user_nickname = request.data.get('user_nickname')
        if not user_nickname:
            return Response({'error': 'Missing required field: user_nickname'}, status=400)

        players = UserInfo.objects.filter(
            user_nickname__icontains=user_nickname,
        ).exclude(
            user_code=user_code
        ).filter(
            user_type="individual"
        )

        serializer = Essencial_User_Info(players, many=True)
        
        return Response({"result" : serializer.data})
    
class withdrawTeam(APIView):
    def delete(self, request):
        data = request.data.copy()

        required_fields = ['team_code', 'user_code']
        errors = {field: f"{field}는 필수 항목입니다." for field in required_fields if field not in data}
        if errors:
            return Response(errors, status=400)
        
        team_code = data['team_code']
        user_code = data['user_code']
        
        if TeamInfo.objects.filter(team_code = team_code, team_host = user_code).exists() :
            return Response({"error" : "감독은 탈퇴 할 수 없습니다."}, status=400)
        
        user_team = UserTeam.objects.filter(user_code = user_code)
        if not user_team.exists():
            return Response({'error' : '유저가 속한 팀이 없습니다.'}, status=400)
        user_team.delete()

        user = UserInfo.objects.filter(user_code = user_code).first()
        if user is not None:
            user.user_type = 'individual'
            user.save()

        return Response({'result' : 'success'}, status=200)



# class getPlayerInfo(APIView):
#     def post(self, request):
#         # 사용자로부터 user_code 파라미터를 입력받음
#         user_code = request.data.get('user_code')
        
#         if not user_code:
#             return Response({"error": "user_code parameter is required."}, status=status.HTTP_400_BAD_REQUEST)
        
#         # user_code를 이용해 UserInfo 테이블에서 필터링
#         user_info = UserInfo.objects.filter(user_code=user_code)
        
#         if not user_info.exists():
#             return Response({"error": "No user found with this user_code."}, status=status.HTTP_404_NOT_FOUND)
        
#         # 필터링된 데이터를 직렬화
#         serializers = UserMainPageSerializer(user_info, many=True)
#         return Response(serializers.data, status=status.HTTP_200_OK)

# class MatchInfoUserAPIView(APIView):
#     def post(self, request):
#         # MatchProcessSerializer에 데이터 전달
#         serializer = MatchProcessSerializer(data=request.data)

#         # 데이터 검증
#         if not serializer.is_valid():
#             return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#         # 처리된 데이터 가져오기
#         result = serializer.process()

#         # 결과 반환
#         return Response(result, status=status.HTTP_200_OK)

# class MatchInfoAsTeamAPIView(APIView):
#     def post(self, request):
#         # 요청 데이터 처리
#         serializer = MatchProcessTeamSerializer(data=request.data)

#         # 데이터 검증
#         if not serializer.is_valid():
#             return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#         # 데이터 처리 및 결과 생성
#         result = serializer.process()

#         # 결과 반환
#         return Response(result, status=status.HTTP_200_OK)
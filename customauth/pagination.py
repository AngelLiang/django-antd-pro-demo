from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from collections import OrderedDict


class CustomPageNumberPagination(PageNumberPagination):
    def __init__(self, pagesize=10):
        self.page_size = pagesize
    page_query_param = 'current'
    page_size_query_param = 'pageSize'

    def get_paginated_response(self, data):
        return Response(OrderedDict([
            ('success', True),
            ('current', self.page.number),
            ('pageSize', self.page.paginator.per_page),
            ('total', self.page.paginator.count),
            ('data', data),
        ]))

    def get_results(self, data):
        return data['data']

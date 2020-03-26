# -*- coding: utf-8 -*-
"""
Created on Fri Mar 20 12:41:48 2020

@author: Ala'a
"""



def check_cols(unit, snum,sname,city,prov,pc):
    if not snum and not sname and not city and not pc:
        return prov
    elif not snum and not sname and not city:
        return prov + ", " + pc 
    elif not snum and not sname:
        return city + ", " + prov + ", " + pc
    else:
        if unit:
            return unit +"-"+ snum + " " + sname + ", " + city + ", " + prov + ", " + pc
        else:
            return snum+ " " + sname + ", " + city + ", " + prov + ", " + pc 

def genType(a,b,c):
    if not a and not b and not c:
        return 'Uknown'

    a = convertToChar(a)
    b = convertToChar(b)
    c = convertToChar(c)
        
    typeBin = str(a)+str(b)+str(c)
    #print(typeBin)
    #return typeBin
    return  int(typeBin, 2) 


def convertToChar(input):
    if not input:
        return '0'
    else:
        return '1'

import pandas as pd
import numpy as np

df = pd.read_csv('ODHF_Final_25Mar.csv')
df['full_address'] = ''
df['Type'] = ''
df.columns

#df = df.replace(np.nan, '', regex=True)
df = df.fillna('')

#df["full_address"] =  df["street_no"]+ " " + df["street_name"] + ", " + df["city"] + ", " + df["province"] + ", " + df["postal_code"]  

df['full_address'] = df.apply(lambda row : check_cols(row['unit'], row['street_no'], row['street_name'].capitalize(), row['municipality'].capitalize(), row['province'].upper(), row['postal_code'].upper()), axis = 1) 
df['Type'] = df.apply(lambda row : genType(row['acute_care'], row['outpatient_services'], row['residential_care']), axis = 1) 

df.to_csv('ODHF_Final_25Mar_v2.csv')
